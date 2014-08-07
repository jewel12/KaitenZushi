{-# LANGUAGE OverloadedStrings #-}

module KaitenZushi (server) where

import Data.Aeson ((.=))
import Data.Aeson.Types
import Control.Applicative
import Control.Monad (mzero)
import Control.Monad.Trans.State.Strict (StateT)
import qualified Data.Aeson as Aeson
import qualified Data.Text as Text
import qualified Network.SocketIO as SocketIO
import qualified Snap.Core as Snap

---------------------------------------------------------

data SushiNeta = SushiNeta Text.Text

instance Aeson.FromJSON SushiNeta where
  parseJSON (Object v) = SushiNeta <$> v .: "neta"
  parseJSON _ = mzero

instance Aeson.ToJSON SushiNeta where
  toJSON (SushiNeta neta) = Aeson.object
    [ "neta" .= neta ]

---------------------------------------------------------

server :: StateT SocketIO.RoutingTable Snap.Snap ()
server = do
  SocketIO.on "place" $ \(SushiNeta neta) ->
      SocketIO.broadcast "placed" (SushiNeta neta)
